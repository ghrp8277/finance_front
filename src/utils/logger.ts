export function logRequest(
  method: string,
  url: string,
  ip: string,
  duration: number
) {
  console.log(
    `[${new Date().toISOString()}] ${method} ${url} from IP: ${ip} - ${duration}ms`
  );
}
