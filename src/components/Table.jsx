import { createClient } from "@supabase/supabase-js";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Table({ invoices, deleteInvoice, editInvoice, items, setItems, getItems }) {
  const navigate = useNavigate();

  function getItemsByInvoiceId(id) {
    return items.filter((item) => item.invoice_id === id);
  }

  function getTotal(id) {
    const items = getItemsByInvoiceId(id);
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  function handleSelectInvoice(id) {
    navigate(`/invoice/${id}`);
  }

  // Make first letter in each word of a string uppercase
  function capitalizeFirstLetter(string) {
    const splitStr = string.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Due Date
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Client Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"># {invoice.id}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{moment(invoice.due_date).format("DD-MM-YYYY")}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{capitalizeFirstLetter(invoice.client_name)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getTotal(invoice.id).toLocaleString("en-DK")} kr.</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.status}</td>
                    <td className="relative whitespace-nowrap py-4 space-x-3 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button onClick={() => handleSelectInvoice(invoice.id)} className="text-indigo-600 hover:text-indigo-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
