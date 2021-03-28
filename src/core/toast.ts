import { ToastNotification, } from "carbon-components-svelte";
import type { ToastNotificationProps, } from "carbon-components-svelte/types/Notification/ToastNotification";


export function toast(el: Element, options: ToastNotificationProps) {
    new ToastNotification({
        target: el,
        props: {
			timeout: 5000,
            ...options,

            //@ts-ignore
            style: "position: absolute; right: 0; top: 0; z-index:8000",

        },
    });
}
