export type LoginPayloadType = {
  email: string;
  password: string;
};

export const useAuthMutation = () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const apiBase = config.public.apiBase;

  const loginApi = async (payload: LoginPayloadType) => {
    const res = await fetch(apiBase + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Invalid credentials');

    return res.json(); // expected: { token: string, user: {...} }
  };

  return useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      // Save token to localStorage (or use cookie for SSR compatibility)

      localStorage.setItem('accessToken', data.accessToken);
      // You might also store user info
      // localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect after login
      router.push('/admin');
    },
  });
};
