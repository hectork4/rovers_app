import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Select from '../components/Select';
import PhotoContext from '../context/photoContext';
import Home from '../pages/Home';


describe('Nasa_app', () => {
    const originalError = console.error;
    console.error = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    afterAll(() => {
        console.error = originalError
    })
    afterEach(cleanup);

    it('its truthy', () => {
        expect(Home).toBeTruthy();
    })

    it('render without crashing', () => {
        const { container } = render (
            <Home />
        )

        expect(container).toBeTruthy();
    })

    it('Consumer has value from provider', () => {
        render(
            <PhotoContext.Provider value={{
                parameters:{
                    rover: 'spirit',
                    camera: 'FHAZ',
                    sol: 0,
                    earth: '2015-06-03'
                }
            }}>
                <Home />
            </PhotoContext.Provider>,
        )
        let options = screen.getAllByTestId('select')[1]
        expect(options).toHaveProperty("value", "spirit")
        options = screen.getAllByTestId('select')[2]
        expect(options).toHaveProperty("value", "FHAZ")
    })
      
    it('Select value correctly', () => {
        render(
            <Select  
                title='Favourites' 
                value={'select'} 
                onChangeFunction={() => console.log("selected")} 
                options={["a", "b", "c"]}
            />);
    
        fireEvent.click(screen.getByTestId('select'), { target: { value: "b" } })
        let options = screen.getAllByTestId('select-option')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    })
})

