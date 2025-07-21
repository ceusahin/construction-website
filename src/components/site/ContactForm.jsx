function ContactForm() {
  return (
    <section className="mt-20 px-4 py-14 bg-blue-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Bize Ulaşın</h2>
        <p className="text-center text-gray-600 mb-8">
          Sorularınız, iş teklifleri veya iş birliği talepleriniz için bizimle
          iletişime geçebilirsiniz.
        </p>

        <form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Adınız"
              className="w-full p-3 border rounded-md bg-white"
              required
            />
            <input
              type="email"
              placeholder="E-posta Adresiniz"
              className="w-full p-3 border rounded-md bg-white"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="tel"
              placeholder="Telefon Numaranız"
              className="w-full p-3 border rounded-md bg-white"
              required
            />
            <input
              type="text"
              placeholder="Konu"
              className="w-full p-3 border rounded-md bg-white"
              required
            />
          </div>

          <textarea
            placeholder="Mesajınız"
            className="w-full p-3 border rounded-md h-32 resize-none bg-white"
            required
          ></textarea>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-md transition-all"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
