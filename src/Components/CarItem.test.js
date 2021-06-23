import {act, render, screen} from '@testing-library/react';
import App from '../App';
import {CarItem} from "./CarItem";
import userEvent from "@testing-library/user-event";

describe('list item',() => {
        const rand = Math.floor(Math.random()*100)
      const car = {
          make: "make"+ rand,
          model: "model" + rand,
          price: 1000 + rand,
          year: "year" + rand,
          image: "https://www.fakephoto.something/" + rand
      }
      test('we have make text', () => {
        render(<CarItem data = {car}/>);
        const listItem = screen.getByText(car.make);
        expect(listItem).toBeInTheDocument();
      });

      test('we have model text', () => {
        render(<CarItem data = {car}/>);
        const listItem = screen.getByText(car.model);
        expect(listItem).toBeInTheDocument();
      });

        test('we have year text', () => {
            render(<CarItem data = {car}/>);
            const listItem = screen.getByText(car.year);
            expect(listItem).toBeInTheDocument();
        });

        test('we have price text', () => {
            render(<CarItem data = {car}/>);
            const price = car.price
            const formattedPrice = "$" + price.toLocaleString()
            const listItem = screen.getByText(formattedPrice);
            expect(listItem).toBeInTheDocument();
        });

        test('we have image', () => {
            render(<CarItem data = {car}/>);
            const listItem = screen.getByRole('img');
            expect(listItem).toBeInTheDocument();
            expect(listItem.getAttribute('src')).toEqual(car.image)
        });

        test('we have a View Details button', () => {
            render(<CarItem data = {car}/>);
            const listItem = screen.getByRole('button');
            expect(listItem).toBeInTheDocument();
            expect(listItem).toHaveTextContent('View Details');
        });

        test('clicking car details button displays car detail view', ()=> {
                let funcWasCalled = false
            const openDetails = (car) => {
                funcWasCalled = true
            }
            render(<CarItem data = {car} openDetails={openDetails}/>);
            const detailsButton = screen.getByRole('button');

            act(() => {
                    userEvent.click(detailsButton)
                }
            )
            expect(funcWasCalled).toBeTruthy()
            // expect(listItem).toBeInTheDocument();

            // expect(listItem).toHaveTextContent('View Details');


        })
    }

)
