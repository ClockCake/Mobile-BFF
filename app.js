const express = require('express');
const app = express();
const port = 3000;


// 监听指定端口
app.listen(port, () => {
console.log(`Server is running on http://localhost:${port}`);

});