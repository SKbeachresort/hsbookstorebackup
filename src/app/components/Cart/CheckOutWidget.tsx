import React from "react";

interface CheckOutWidgetProps {
    totalAmount : number;
    cartItems : any[]; 
}

export const CheckOutWidget:React.FC<CheckOutWidgetProps> = ({
    totalAmount,
    cartItems
}) => {
  return (
    <div className="bg-white border-[1px] border-borderColor p-4 shadow rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">Summary</h3>
      <div className="mb-2">
        <div className="flex justify-between">
          <span className="text-md">Subtotal ({cartItems.length} items)</span>
          <span>
            KWD {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-xstext-textgray">Shipping</span>
          <span className="text-secondary text-xs">Free</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-xs">Taxes</span>
          <span className="text-xs">Calculated at checkout</span>
        </div>
      </div>
      <hr />
      <div className="my-2">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>
            KWD {totalAmount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </div>
      </div>
      <hr />
      <button className="w-full mt-4 py-2 text-md bg-secondary text-white font-semibold rounded-full">
        Checkout
      </button>
      <p className="text-sm mt-2 underline">
        For the best experience{" "}
        <a href="#" className="ml-2 font-semibold text-secondary">
          Sign in
        </a>
      </p>
    </div>
  );
};
