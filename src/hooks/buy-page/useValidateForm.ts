import { reactive, ref, watch } from 'vue';
import { z } from 'zod';
import type { OrderObject, CustomerObject } from '@/types/buy';

export function useValidateForm(orderObj: OrderObject, customerObj: CustomerObject) {
  const { locale } = useI18n();

  const isSubmmited = ref<boolean>(false);
  const liveInVietnam = computed(() => locale.value === 'vi');

  // Error containers
  const orderErrors = reactive<{ [key: string]: string }>({});
  const customerErrors = reactive<{ [key: string]: string }>({});

  // Order validation schema
  const orderSchema = z.object({
    project_id: z.any().refine(val => val !== null, { message: 'Please select a software.' }),
    project_package_id: z
      .any()
      .refine(val => val !== null, { message: 'Please select a package.' }),
  });

  // Customer validation schema
  const customerSchema = z.object({
    display_name: z.string().min(1, { message: 'Name is required.' }),
    addressText: z.string().refine(
      val => {
        if (liveInVietnam.value) return true;
        return !!val && val.length > 0;
      },
      { message: 'Address is required.' }
    ),
    province: z.any().refine(
      val => {
        if (!liveInVietnam.value) return true;
        return !!val;
      },
      { message: 'Province is required.' }
    ),
    district: z.any().refine(
      val => {
        if (!liveInVietnam.value) return true;
        return !!val;
      },
      { message: 'District is required.' }
    ),
    ward: z.any().refine(
      val => {
        if (!liveInVietnam.value) return true;
        return !!val;
      },
      { message: 'Ward is required.' }
    ),
  });

  // Validate all form data
  const validateForm = (): boolean => {
    // Clear previous errors
    Object.keys(orderErrors).forEach(key => {
      orderErrors[key] = '';
    });

    Object.keys(customerErrors).forEach(key => {
      customerErrors[key] = '';
    });

    const orderValidation = orderSchema.safeParse(orderObj);
    const customerValidation = customerSchema.safeParse(customerObj);

    if (!orderValidation.success || !customerValidation.success) {
      if (!orderValidation.success) {
        orderValidation.error.errors.forEach(e => {
          if (e.path[0]) orderErrors[e.path[0]] = e.message;
        });
      }
      if (!customerValidation.success) {
        customerValidation.error.errors.forEach(e => {
          if (e.path[0]) customerErrors[e.path[0]] = e.message;
        });
      }
      return false;
    }
    return true;
  };

  // Set up watchers for validation
  watch(orderObj, () => isSubmmited.value && validateForm(), { deep: true });
  watch(customerObj, () => isSubmmited.value && validateForm(), { deep: true });

  return {
    orderErrors,
    customerErrors,
    isSubmmited,
    validateForm,
  };
}
