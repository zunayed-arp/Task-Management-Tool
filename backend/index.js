import express from 'express';

const PORT = process.env.PORT || 8000;

const app = express();

const log = msg => console.log(msg);

app.listen(PORT, () => {
	log(`Server is running at port ${PORT}`);
});
