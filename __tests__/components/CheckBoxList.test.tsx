import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { CheckBoxList, CheckBoxListItem } from "@/components/CheckBoxList";


const ITEMS: CheckBoxListItem[] = [{
        id: '1', 
        text: 'Item #1',
        checked: false,
    }, {
        id: '2', 
        text: 'Item #2',
        checked: true,
    }, {
        id: '3', 
        text: 'Item #3',
        checked: false,
    }
];


describe("CheckBoxList testing", () => {
    it("Checks that all checkboxes are rendered correctly", () => {
        render(<CheckBoxList items={ITEMS} />);
        
        expect(screen.getByTestId('checkbox-item-1').props.accessibilityState.checked).toBeFalsy();
        expect(screen.getByTestId('text-item-1').props.children).toEqual('Item #1');

        expect(screen.getByTestId('checkbox-item-2').props.accessibilityState.checked).toBeTruthy();
        expect(screen.getByTestId('text-item-2').props.children).toEqual('Item #2');

        expect(screen.getByTestId('checkbox-item-3').props.accessibilityState.checked).toBeFalsy();
        expect(screen.getByTestId('text-item-3').props.children).toEqual('Item #3');
    });

    it("Checks that events are delivered correctly", () => {
        const listItemChangeHandler = jest.fn();

        render(<CheckBoxList items={ITEMS} onListItemChange={listItemChangeHandler} />);
        fireEvent.press(screen.getByTestId('checkbox-item-2'));

        expect(listItemChangeHandler).toBeCalledWith(ITEMS[1]);
    });

});