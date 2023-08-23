import { v4 } from "uuid";
import { createRoot, Root } from "react-dom/client";
import { Message } from "./message";

interface Message {
  id: string;
  message: string;
}

class Toast {
  #toast: Root | null;
  #messages: Message[];
  #defaultDuration: number;

  constructor() {
    if (typeof document !== undefined) {
      const toast = document.getElementById("__toast");
      this.#toast = createRoot(toast!);
    } else {
      this.#toast = null;
    }
    this.#messages = [];
    this.#defaultDuration = 3000;
  }

  #autoClose(duration: number, id: string) {
    setTimeout(
      () => {
        this.#close(id);
      },
      duration,
      this
    );
  }

  #close(closeID: string) {
    if (this.#toast) {
      const index = this.#messages.findIndex(({ id }) => id === closeID);
      this.#messages.splice(index, 1);
      this.#toast.render(
        <Message messages={this.#messages} close={this.#close.bind(this)} />
      );
    }
  }

  message(message: string, duration = this.#defaultDuration) {
    const uuid = v4();
    if (this.#toast && this.#messages.length < 3) {
      this.#messages.push({
        id: uuid,
        message,
      });
      this.#toast.render(
        <Message messages={this.#messages} close={this.#close.bind(this)} />
      );
      this.#autoClose(duration, uuid);
    }
  }
}

export default Toast;
