import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import { NumericFormat } from "react-number-format";

import "react-datepicker/dist/react-datepicker.css";

export default function Slideover({ handleSubmit, form, setForm, open, setOpen, itemList, setItemList }) {
  function handleChange(e) {
    // set to lowercase
    if (
      e.target.name === "status" ||
      e.target.name === "client_country" ||
      e.target.name === "client_city" ||
      e.target.name === "client_zip" ||
      e.target.name === "client_street" ||
      e.target.name === "client_name" ||
      e.target.name === "client_email"
    ) {
      setForm({ ...form, [e.target.name]: e.target.value.toLowerCase() });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddItem() {
    setItemList([...itemList, { invoice_id: null, name: "", quantity: 0, price: 0 }]);
  }

  function handleRemoveItem(index) {
    setItemList(itemList.filter((_, i) => i !== index));
  }

  function handleItemChange(e, index) {
    const { name, value } = e.target;

    if (name === "quantity" || name === "price") {
      // remove all periods
      let removed = "";

      for (let i = 0; i < value.length; i++) {
        removed += value[i] === "." ? "" : value[i];
      }

      // replace commas with periods
      const replaced = removed.replace(",", ".");

      // turn into a float
      const number = parseFloat(replaced);

      const list = [...itemList];
      list[index][name] = number;
      setItemList(list);
      return;
    }

    // set to lowercase
    if (name === "name" || name === "description") {
      const list = [...itemList];
      list[index][name] = value.toLowerCase();
      setItemList(list);
      return;
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => (setOpen(false), setItemList([]))}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                  <form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">New invoice</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">Create a new invoice by filling out all the fields below.</p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label htmlFor="client_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Client's Name
                              </label>
                              <div className="mt-2">
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  name="client_name"
                                  id="client_name"
                                  placeholder="Jane Doe"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="client_email" className="block text-sm font-medium leading-6 text-gray-900">
                                Client's Email
                              </label>
                              <div className="mt-2">
                                <input
                                  onChange={handleChange}
                                  type="email"
                                  name="client_email"
                                  id="client_email"
                                  placeholder="jane@doe.com"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="client_country" className="block text-sm font-medium leading-6 text-gray-900">
                                Country
                              </label>
                              <div className="mt-2">
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  name="client_country"
                                  id="client_country"
                                  placeholder="United States"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="client_street" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  name="client_street"
                                  id="client_street"
                                  placeholder="123 Main St."
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 space-y-4 sm:space-y-0 sm:space-x-4 sm:grid-cols-2">
                              <div>
                                <label htmlFor="client_zip" className="block text-sm font-medium leading-6 text-gray-900">
                                  Zip code
                                </label>
                                <div className="mt-2">
                                  <input
                                    onChange={handleChange}
                                    type="text"
                                    name="client_zip"
                                    id="client_zip"
                                    placeholder="12345"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="client_city" className="block text-sm font-medium leading-6 text-gray-900">
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    onChange={handleChange}
                                    type="text"
                                    name="client_city"
                                    id="client_city"
                                    placeholder="San Francisco"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 space-y-4 sm:space-y-0 sm:space-x-4 sm:grid-cols-2">
                              <div>
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                  Invoice Date
                                </label>
                                <div className="mt-2">
                                  <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={form.date}
                                    minDate={form.date}
                                    className="block bg-gray-100 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="due_date" className="block text-sm font-medium leading-6 text-gray-900">
                                  Due Date
                                </label>
                                <div className="mt-2">
                                  <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    name="due_date"
                                    selected={form.due_date}
                                    onChange={(date) => setForm({ ...form, due_date: date })}
                                    minDate={form.date}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  onChange={handleChange}
                                  rows={4}
                                  name="description"
                                  id="description"
                                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                  defaultValue={""}
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium leading-6 text-gray-900">Item List</label>
                              {itemList.map((item, index) => (
                                <div key={index} className="mt-2">
                                  <div className="gap-2 flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                      <input
                                        onChange={(e) => handleItemChange(e, index)}
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <NumericFormat
                                        onChange={(e) => handleItemChange(e, index)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        name="quantity"
                                        id="quantity"
                                        placeholder="Qty."
                                        allowNegative={false}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        decimalScale={2}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <NumericFormat
                                        onChange={(e) => handleItemChange(e, index)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        name="price"
                                        id="price"
                                        placeholder="Price"
                                        allowNegative={false}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        decimalScale={2}
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <NumericFormat
                                        className="block w-full bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        name="total"
                                        disabled
                                        value={item.quantity * item.price}
                                        suffix=" kr."
                                        id="total"
                                        placeholder="Total"
                                        allowNegative={false}
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        decimalScale={2}
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <button
                                        onClick={() => handleRemoveItem(index)}
                                        type="button"
                                        className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 hover:bg-red-500"
                                      >
                                        <TrashIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="mt-2">
                                <button
                                  onClick={handleAddItem}
                                  type="button"
                                  className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  Add New Item
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => (setOpen(false), setItemList([]))}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
