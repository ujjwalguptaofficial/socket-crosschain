import { Mahal } from "mahal";
import App from "@/app.mahal";
import config from "~/config/env";
import "@/styles/index.scss";


const app = new Mahal(App, '#app');
 
// set config to be available globally
app.global.env = config;

app.create();