import { useState, useMemo, useEffect, useRef } from "react";
import { App } from "../App";
import { useChat } from "../hooks/use-chat";
import { ChatMessage } from "../components/ChatMessage";
import { appConfig } from "../../config.browser";
import { Welcome } from "../components/Welcome";

export default function Index() {
  // The content of the box where the user is typing
  const [message, setMessage] = useState<string>("");

  // This hook is responsible for managing the chat and communicating with the
  // backend
  const { currentChat, chatHistory, sendMessage, cancel, state, clear } =
    useChat();

  // This is the message that is currently being generated by the AI
  const currentMessage = useMemo(() => {
    return { content: currentChat ?? "", role: "assistant" } as const;
  }, [currentChat]);

  // This is a ref to the bottom of the chat history. We use it to scroll
  // to the bottom when a new message is added.
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [currentChat, chatHistory, state]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // This is a ref to the input box. We use it to focus the input box when the
  // user clicks on the "Send" button.
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, [state]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Add null check to safely access files property

    if (file) {
      // Aquí puedes realizar operaciones con el archivo, como enviarlo a tu servidor o mostrar una vista previa.
      // Por ejemplo, para mostrar una vista previa de la imagen seleccionada:
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result; // URL de la imagen en formato base64
        // Haz lo que necesites con el URL de la imagen (p. ej., mostrarla en tu interfaz).
      };
      reader.readAsDataURL(file); // Lee el archivo como un URL base64
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Add null check to safely access files property  

    if (file) {
      // Aquí puedes realizar operaciones con el archivo, como enviarlo a tu servidor o mostrar una vista previa.
      // Por ejemplo, para mostrar una vista previa de la imagen seleccionada:
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result; // URL de la imagen en formato base64
        // Haz lo que necesites con el URL de la imagen (p. ej., mostrarla en tu interfaz).
      };
      reader.readAsDataURL(file); // Lee el archivo como un URL base64
    }
  };


  return (
    <App title="TravelMate">
      <main className="bg-white md:rounded-lg md:shadow-md p-6 w-full h-full flex flex-col">
        <section className="overflow-y-auto flex-grow mb-4 pb-8">
          <div className="flex flex-col space-y-4">
            {chatHistory.length === 0 ? (
              <>
                <Welcome />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {appConfig.samplePhrases.map((phrase) => (
                    <button
                      key={phrase}
                      onClick={() => sendMessage(phrase, chatHistory)}
                      className="bg-gray-100 border-gray-300 border-2 rounded-lg p-4"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center">
                  <p className="text-sm text-gray-500 mt-5">
                    Built with 🤖{" "}
                    <a
                      className="underline"
                      href="https://github.com/ascorbic/daneel"
                    >
                      Daneel
                    </a>
                  </p>
                </div>
              </>
            ) : (
              chatHistory.map((chat, i) => (
                <ChatMessage key={i} message={chat} />
              ))
            )}

            {currentChat ? <ChatMessage message={currentMessage} /> : null}
          </div>

          <div ref={bottomRef} />
        </section>
        <div className="flex items-center justify-center h-20">
          {state === "idle" ? null : (
            <button
              className="bg-gray-100 text-gray-900 py-2 px-4 my-8"
              onClick={cancel}
            >
              Detener generacion
            </button>
          )}
        </div>
        <section className="bg-gray-100 rounded-lg p-2">
          <form
            className="flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(message, chatHistory);
              setMessage("");
            }}
          >
            {chatHistory.length > 1 ? (
              <button
                className="bg-gray-100 text-gray-600 py-2 px-4 rounded-l-lg"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  clear();
                  setMessage("");
                }}
              >
                Limpiar
              </button>
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer"
            >
              <button
                className="bg-green-400 text-white font-bold py-2 px-4 rounded-l-lg"
                type="button"
              >
                Imagen
              </button>
            </label>

            <input
              type="file"
              accept="audio/*"
              onChange={(e) => { handleAudioUpload(e) }}
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="cursor-pointer"
            >
              <button
                className="bg-purple-400 text-white font-bold py-2 px-4"
                type="button"
              >
                Audio
              </button>
            </label>
            <input
              type="text"
              ref={inputRef}
              className="w-full rounded-l-lg p-2 outline-none"
              placeholder={state == "idle" ? "Type your message..." : "..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={state !== "idle"}
            />
            {state === "idle" ? (
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
                type="submit"
              >
                Enviar
              </button>
            ) : null}
          </form>

        </section>
      </main>
    </App>
  );
}