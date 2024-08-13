import { useState } from 'react';

export default function Translate() {
  const [input, setInput] = useState('');
  const [translations, setTranslations] = useState({ chatgpt: '', google: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async (event) => {
    event.preventDefault();
    if (!input.trim()) {
      setError('Please enter some text to translate.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const [chatgptRes, googleRes, deeplRes] = await Promise.all([
        fetch(`/api/chatgpt-translate?text=${encodeURIComponent(input)}`),
        fetch(`/api/google-translate?text=${encodeURIComponent(input)}`),
        fetch(`/api/deepl-translate?text=${encodeURIComponent(input)}`),
      ]);

      const chatgptData = await chatgptRes.json();
      const googleData = await googleRes.json();
      const deepLData = await deeplRes.json();

      if (chatgptRes.ok && googleRes.ok) {
        setTranslations({
          chatgpt: chatgptData.translation,
          google: googleData.translation,
          deepl: deepLData.translation,
        });
      } else {
        setError('Failed to get translations from one or both services.');
      }
    } catch (err) {
      setError('An error occurred while fetching the translations.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <>


      <div className="text_container">
        <div className="logo">
          <img src={"/logo.png"} alt="" />
        </div>


      </div>
      <div className='container'>





        <form id="contactForm" onSubmit={handleTranslate}>

          <div className="form-group">
            <label className="message" htmlFor="message">النص باللغة العربية:</label>
            <textarea
              id="message"
              name="message"
              required
              style={{ resize: "none", paddingRight: '16px' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="أدخل النص للترجمة"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'يترجم...' : 'ترجم الأن'}
          </button>

          <div className="form-group">
            <label className="email" htmlFor="chatgpt">ChatGPT:</label>
            <input
              type="text"
              id="chatgpt"
              name="chatgpt"
              value={translations.chatgpt}
              readOnly
              dir='ltr'
              style={{ paddingLeft: '16px' }}
            />
          </div>
          <div className="form-group">
            <label className="email" htmlFor="deepl">Deep-L:</label>
            <input
              type="text"
              id="deepl"
              name="deepl"
              value={translations.deepl}
              readOnly
              dir='ltr'
              style={{ paddingLeft: '16px' }}
            />
          </div>

          <div className="form-group">
            <label className="email" htmlFor="google">Google:</label>
            <input
              type="text"
              id="google"
              name="google"
              value={translations.google}
              readOnly
              dir='ltr'
              style={{ paddingLeft: '16px' }}
            />
          </div>

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

    </>

  )
}
