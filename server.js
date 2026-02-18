const app = require("./app");
const PORT = process.env.PORT || 3002;


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
};

