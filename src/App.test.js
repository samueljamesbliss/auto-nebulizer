import {act, getByTestId, render, screen, within} from '@testing-library/react';
import App from './App';
import nock from 'nock';
import userEvent from "@testing-library/user-event";

describe('App', () => {
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    let mockCarList = []
    beforeAll(() => {
        mockCarList = []
        const returnCar = (item) => {
            return {
                id: "id" + item,
                make: "make" + item,
                model: "model" + item,
                price: 1000 + item,
                color: "color" + item,
                year: "year" + item,
                image: "https://www.fakephoto.something/" + item,
                available: true
            }
        }
        for (let i = 1; i < 10; i++) {
            mockCarList.push(returnCar(i))
        }
        nock('http://localhost:5000')
            .get('/api/vehicles')
            .reply(200, mockCarList, {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            })
            .persist()
    })
    test('renders car list', async () => {
        render(<App/>);
        await act(() => sleep(100));
        const list = screen.getByTestId('car-list');
        expect(list).toBeInTheDocument();
    });
    test("should retrieve list of cars from api", async () => {
        render(<App/>);
        await act(() => sleep(100));
        const list = screen.getByTestId('car-list');
        const {getAllByTestId} = within(list)
        const items = getAllByTestId("car-item")
        expect(items.length).toEqual(mockCarList.length);
    })
    test('should search cars based on entered search criteria', async () => {
        render(<App/>);
        await act(() => sleep(100));

        const model = screen.getByLabelText("Model")
        userEvent.type(model, 'model1')

        const filterer = screen.getByTestId('car-filter')
        const {getByRole} = within(filterer)
        const button = getByRole("button")
        act(() => {
                userEvent.click(button)
            }
        )
        await act(() => sleep(100));

        const list = screen.getByTestId('car-list');
        const {getAllByTestId} = within(list)
        const items = getAllByTestId("car-item")
        expect(items.length).toEqual(1);
    })
})