import registerRequireContextHook from "babel-plugin-require-context-hook/register";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

registerRequireContextHook();
Enzyme.configure({ adapter: new Adapter() });
