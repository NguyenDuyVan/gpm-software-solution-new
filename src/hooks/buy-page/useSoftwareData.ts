import { debounce } from '@/helpers';
import type { OrderObject, UIData, Project, ApiResponse } from '@/types/buy';

export function useSoftwareData(orderObj: OrderObject, isGlobal: Ref<boolean>) {
  const db = useCustomerService();
  const isLoadingAffInfo = ref<boolean>(false);
  const affMessage = ref<string>('');
  const isGlobalUser = computed(() => isGlobal.value);

  const softwareData = reactive<UIData>({
    projectModules: [],
    projectPackages: [],
    projects: [],
  });

  // Handle software selection
  const onSelectedSoftware = (): void => {
    const project_id = orderObj.project_id;
    const selectedProject = softwareData.projects.find(item => item.id == project_id);

    if (selectedProject === undefined) return;

    // Reset modules and packages
    softwareData.projectModules = [];
    softwareData.projectPackages = [];

    // Populate modules
    selectedProject.modules.forEach(item => {
      softwareData.projectModules.push({
        name: item.name,
        price: item.price,
        global_price: item.global_price,
        selected: false,
      });
    });

    // Populate packages
    softwareData.projectPackages = selectedProject.packages;
    if (softwareData.projectPackages.length > 0) {
      orderObj.project_package_id = softwareData.projectPackages[0].id;
      orderObj.actual_price = softwareData.projectPackages[0].price;
    }
  };

  // Load projects from API
  const loadProjectSelectBoxAsync = async (): Promise<void> => {
    const result: ApiResponse<Project[]> = await db.getCanBuyProjectsAsync();
    if (result.success === true && result.data) {
      softwareData.projects = result.data;

      // Auto select from 'f' query param
      let autoSelectId: string | number | undefined = undefined;
      const storedF = localStorage.getItem('f');
      if (storedF) {
        const project = softwareData.projects.find(p => p.name === storedF);
        if (project) {
          orderObj.project_id = project.id;
          autoSelectId = project.id;
          onSelectedSoftware();
        }
        localStorage.removeItem('f');
      }

      if (autoSelectId) orderObj.project_id = autoSelectId;
    }
  };

  const formatVnPrice = (price: number): string => {
    if (!isGlobalUser.value) return formatPrice(price * 1000);
    return price + ' USD';
  };

  // Get price based on location
  const getPriceByLocation = (obj: { price: number; global_price: number }): string => {
    if (isGlobalUser.value) return obj.global_price.toString();
    return obj.price.toString();
  };

  // Calculate total price
  const caculatePriceAsync = async (): Promise<void> => {
    try {
      const selectPackage = softwareData.projectPackages.find(
        item => item.id == orderObj.project_package_id
      );

      if (selectPackage) {
        orderObj.actual_price = parseInt(getPriceByLocation(selectPackage));

        // Add module prices
        const selectedModules = softwareData.projectModules.filter(
          item => item.selected && !item.disabled
        );

        selectedModules.forEach(item => {
          orderObj.actual_price += parseInt(getPriceByLocation(item));
        });

        // Apply affiliate discount if any
        if (orderObj.affiliate_code) {
          isLoadingAffInfo.value = true;
          const checker: ApiResponse<any> = await db.getAffiliateInfoAsync(orderObj.affiliate_code);

          if (checker.success === true) {
            const saleOffPercent = parseInt(process.env.VUE_APP_AFFILIATE_PERCENT_FOR_BUYER || '0');
            if (orderObj.actual_price > 0) {
              orderObj.actual_price = ((100 - saleOffPercent) * orderObj.actual_price) / 100;
            }
          }

          affMessage.value = checker.message || '';
          isLoadingAffInfo.value = false;
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error calculating price:', error);
    }
  };

  // Handle affiliate code change
  const affCodeChangedEvent = async (): Promise<void> => {
    debounce(caculatePriceAsync);
  };

  return {
    onSelectedSoftware,
    loadProjectSelectBoxAsync,
    affCodeChangedEvent,
    formatVnPrice,
    caculatePriceAsync,
    isLoadingAffInfo,
    affMessage,
    softwareData,
  };
}
