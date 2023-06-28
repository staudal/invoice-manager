import { useParams } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/20/solid";
import { createClient } from "@supabase/supabase-js";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Details() {
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({});
  const [items, setItems] = useState([]);

  // Get the id from the url
  const { id } = useParams();

  // Get the invoice matching the id
  async function getInvoice() {
    const { data } = await supabase.from("invoices").select("*").eq("id", id).single();
    setInvoice(data);
  }

  // Get the items matching the invoice id
  async function getItems(id) {
    const { data } = await supabase.from("items").select("*").eq("invoice_id", id);
    setItems(data);
  }

  // Delete the invoice with the matching id
  async function handleDelete(id) {
    await supabase.from("invoices").delete().eq("id", id);
    navigate("/");
  }

  // Mark the invoice as paid
  async function handleMarkAsPaid(id) {
    await supabase.from("invoices").update({ status: "paid" }).eq("id", id);
    getInvoice();
  }

  // Capitalize the first letter of each word in a string (including æøå)
  function capitalize(str) {
    return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  }

  useEffect(() => {
    getInvoice();
    getItems(id);
  }, []);

  if (!invoice.id) return null;

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => navigate("/")}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
        >
          <HomeIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Dashboard
        </button>
        <h1 className="text-base font-semibold leading-6 text-gray-900 ml-4">Invoice #{invoice.id}</h1>

        <div className="ml-auto">
          {invoice.status === "pending" ? (
            <button
              onClick={() => handleMarkAsPaid(invoice.id)}
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Mark as Paid
            </button>
          ) : (
            <span className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Paid
            </span>
          )}

          <button
            onClick={() => handleDelete(invoice.id)}
            type="button"
            className="inline-flex items-center ml-2 px-3 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2">
        <div>
          <p className="font-bold mb-2">From:</p>
          <p className="text-gray-500">Example Company ApS</p>
          <p className="text-gray-500">example@company.dk</p>
          <p className="text-gray-500">Teglholmsgade 12b</p>
          <p className="text-gray-500">2450 København SV</p>
          <p className="text-gray-500">Denmark</p>
        </div>
        <div className="text-right">
          <p className="font-bold mb-2">To:</p>
          <p className="text-gray-500">{capitalize(invoice.client_name)}</p>
          <p className="text-gray-500">{invoice.client_email}</p>
          <p className="text-gray-500">{capitalize(invoice.client_street)}</p>
          <p className="text-gray-500">
            {invoice.client_zip} {capitalize(invoice.client_city)}
          </p>
          <p className="text-gray-500">{capitalize(invoice.client_country)}</p>
        </div>
      </div>

      <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg p-6 bg-gray-50 mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">Invoice Date</p>
          <p className="text-sm font-semibold text-gray-500">{moment(invoice.date).format("DD-MM-YYYY")}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm font-semibold text-gray-900">Due Date</p>
          <p className="text-sm font-semibold text-gray-500">{moment(invoice.due_date).format("DD-MM-YYYY")}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm font-semibold text-gray-900">Invoice Status</p>
          <p className="text-sm font-semibold text-gray-500">{capitalize(invoice.status)}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="mt-6 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Quantity
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Inline Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{capitalize(item.name)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.price.toLocaleString("en-DK")} kr.</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(item.price * item.quantity).toLocaleString("en-DK")} kr.</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Total incl. VAT</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-bold"></td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-semibold">
                        {items.reduce((acc, item) => acc + item.quantity * item.price, 0).toLocaleString("en-DK")} kr.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-gray-500">No items added to this invoice.</p>
        </div>
      )}
    </>
  );
}
