declare module 'emailjs-com' {
  export function init(userId: string): void;
  export function sendForm(
    serviceId: string,
    templateId: string,
    form: string | HTMLFormElement,
    userId?: string
  ): Promise<any>;
}
