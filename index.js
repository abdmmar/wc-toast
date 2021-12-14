import toast from './toast.js';
import WCToast from './wc-toast.js';
import WCToastItem from './wc-toast-item.js';
import WCToastIcon from './wc-toast-icon.js';
import WCToastContent from './wc-toast-content.js';

customElements.define('wc-toast', WCToast);
customElements.define('wc-toast-item', WCToastItem);
customElements.define('wc-toast-icon', WCToastIcon);
customElements.define('wc-toast-content', WCToastContent);

export { toast, WCToast, WCToastItem, WCToastContent, WCToastIcon };
