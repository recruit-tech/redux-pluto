import registerRequireContextHook from "babel-plugin-require-context-hook/register";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import axios from "axios";
import httpAdapter from "axios/lib/adapters/http";

axios.defaults.adapter = httpAdapter;

registerRequireContextHook();
Enzyme.configure({ adapter: new Adapter() });
