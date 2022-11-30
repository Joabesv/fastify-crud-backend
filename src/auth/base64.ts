export type Base64String = string;

export function base64(input: string): Base64String {
  return Buffer.from(input, 'utf-8').toString('base64');
}

export function unbase64(input: Base64String): string {
  return Buffer.from(input, 'base64').toString('utf-8');
}
