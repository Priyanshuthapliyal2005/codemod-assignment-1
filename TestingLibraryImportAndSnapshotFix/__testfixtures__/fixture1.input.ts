import { render } from 'enzyme-to-json';

expect(render(<SelfClosingComponent />)).toMatchSnapshot();