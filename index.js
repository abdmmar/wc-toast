import toast from './toast.js';
import WCToast from './wc-toast.js';
import WCToastItem from './wc-toast-item.js';
import WCToastIcon from './wc-toast-icon.js';
import WCToastContent from './wc-toast-content.js';
import WCToastCloseButton from './wc-toast-close-button.js';

customElements.define('wc-toast', WCToast);
customElements.define('wc-toast-item', WCToastItem);
customElements.define('wc-toast-icon', WCToastIcon);
customElements.define('wc-toast-content', WCToastContent);
customElements.define('wc-toast-close-button', WCToastCloseButton);

export { toast, WCToast, WCToastItem, WCToastContent, WCToastIcon, WCToastCloseButton };
