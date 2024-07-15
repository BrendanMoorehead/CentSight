import supabase from './supabase';
export function getAuthToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  return refreshToken;
}

// export async function setUserSession() {
//   const accessToken = getAuthToken();
//   const Token = getRefreshToken();
//   const { data, error } = await supabase.auth.setSession({
//     accessToken,
//     refreshToken,
//   });
// }
