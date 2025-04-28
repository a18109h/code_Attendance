document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    const studentIdInput = document.getElementById('student-id');
    const messageArea = document.getElementById('message');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw5l3DCH654kYsJ5f6_XQh1mBw7Q5WVpZXvHTiTpUA205rjw4SgV6TxxMKJ4LcqYpQ/exec'; // 

    submitBtn.addEventListener('click', () => {
        const studentId = studentIdInput.value.trim();

        if (!studentId) {
            messageArea.textContent = "学籍番号を入力してください。";
            return;
        }

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify({ studentId: studentId }),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // レスポンスをテキストとして処理
            } else {
                throw new Error('サーバーエラーが発生しました。');
            }
        })
        .then(data => {
            messageArea.textContent = data === "OK" ? "出席を記録しました！" : data; // レスポンスが "OK" なら成功メッセージ、そうでなければサーバーからのメッセージを表示
        })
        .catch(error => {
            console.error('通信エラー:', error);
            messageArea.textContent = "通信エラーが発生しました。";
        });
    });
});