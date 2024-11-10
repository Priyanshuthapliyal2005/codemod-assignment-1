import { render } from '@testing-library/react';


const { container } = render(<SelfClosingComponent />);
expect(container).toMatchSnapshot();
