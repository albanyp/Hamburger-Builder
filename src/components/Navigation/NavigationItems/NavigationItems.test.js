import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16"
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems";

configure({adapter: new Adapter()});

describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);

    });

    it("should render two <NavigationItem /> elements if not authenticated",
        () => {
            expect(wrapper.find(<NavigationItem />)).toHaveLength(2);
        });


    it("should render two <NavigationItem /> elements if not authenticated",
        () => {
            // wrapper = shallow(<NavigationItems isAuthenticated />);
            wrapper.setProps({isAuthenticated: true});
            expect(wrapper.find(<NavigationItem />)).toHaveLength(3);
        });
    
    it("should render two <NavigationItem /> elements if not authenticated",
        () => {
            wrapper.setProps({isAuthenticated: true});
            expect(wrapper.find(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
        });
}); 











/* 
- enzyme: to test
- enzyme adapter needs to be adequeated to
 my react version
- describe() method will be automatically
    taken once I run the project. It doesn't
    need to be imported. The second argument
    of this method is the testing function
- it() will be available as well. It allows to 
    write one individual test. Its first argument
    is for describing what the component should do.
    Its second argument it's a function for testing
- enzyme allows to render the component that's
    being tested independently from the others
- configure({adapter: new Adapter()});
    This is the way to link enzyme to the
    current React version
- shallow is the helper to render React 
    components with all its content but not
    deeply. Their content isn't rendered
- expect (globally available) it's the method
    used to determine what should be happening
- toHaveLength() is the method to check how many
    times what is being looked for should happen






*/