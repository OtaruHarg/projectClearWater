var type_now = 1;
var fin = "false";

window.onload = mainloops();


document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW') {
        mainloops();
    }else if (event.code === 'KeyS') {
        console.log('後退');
    }
});



async function mainloops(){
    while(fin != "true"){
        const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));//timeはミリ秒
        await sleep(100);
        switch(type_now){
            case 1:
                console.log("one");
                const output = document.getElementById('output');
                    if ('NDEFReader' in window) {
                        try {
                            const ndef = new NDEFReader();
                            await ndef.scan();
                            output.textContent = "スキャン中... タグをかざしてください。";
                            ndef.addEventListener("readingerror", () => {
                                output.textContent = "読み取りエラーが発生しました。";
                            });
                            ndef.addEventListener("reading", ({ message, serialNumber }) => {
                                output.textContent = `シリアル番号: ${serialNumber}\n`;
                                for (const record of message.records) {
                                    output.textContent += `データ型: ${record.recordType}\n`;
                                    // テキストデータの場合
                                    if (record.recordType === "text") {
                                        const textDecoder = new TextDecoder(record.encoding);
                                        output.textContent += `内容: ${textDecoder.decode(record.data)}\n`;
                                    }
                                }
                            });
                        } catch (error) {
                            output.textContent = `エラー: ${error}`;
                        }
                    } else {
                        output.textContent = "Web NFCはこのブラウザでサポートされていません。";
                    }
                    break;
        }
    }
}