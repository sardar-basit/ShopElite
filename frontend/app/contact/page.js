'use client';
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Contact Us</h1>
      <p className="text-center text-gray-500 mb-10">
        Have questions, comments, or concerns? We'd love to hear from you. Fill out the form below and our team will get back to you within 24 hours.
      </p>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">First Name</label>
              <input type="text" className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-800" placeholder="John" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Last Name</label>
              <input type="text" className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-800" placeholder="Doe" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input type="email" className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-800" placeholder="john@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Message</label>
            <textarea rows="5" className="border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-800" placeholder="How can we help you?"></textarea>
          </div>
          
          <button type="button" onClick={() => alert('Thanks for reaching out! We will contact you soon.')} className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
