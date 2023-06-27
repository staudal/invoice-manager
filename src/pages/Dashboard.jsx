import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Slideover from "../components/Slideover";
import Table from "../components/Table";
import Header from "../components/Header";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [openSlideover, setOpenSlideover] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_country: "",
    client_street: "",
    client_city: "",
    client_zip: "",
    due_date: new Date(),
    date: new Date(),
    description: "",
    status: "pending",
  });

  async function getInvoices() {
    const { data, error } = await supabase.from("invoices").select("*");
    if (error) console.log(error);
    setInvoices(data);
  }

  async function getItems() {
    let { data: items, error } = await supabase.from("items").select("*");

    if (error) console.log(error);
    setItems(items);
  }

  async function generateNewInvoice(e) {
    e.preventDefault();

    // Adding the form to the database
    const { data, error } = await supabase.from("invoices").insert([form]).select();

    // Adding the invoice id to the items
    itemList.forEach((item) => {
      item.invoice_id = data[0].id;
    });

    const { data: itemsData, error: itemsError } = await supabase.from("items").insert(itemList).select();

    if (error || itemsError) {
      toast.error("Something went wrong");
      console.log(error);
    } else {
      toast.success("Invoice created successfully");
      setForm({
        client_name: "",
        client_email: "",
        client_country: "",
        client_street: "",
        client_city: "",
        client_zip: "",
        due_date: new Date(),
        date: new Date(),
        description: "",
        status: "pending",
      });
      setItemList([]);
      setOpenSlideover(false);
      getInvoices();
      getItems();
    }
  }

  async function deleteInvoice(id) {
    const { data, error } = await supabase.from("invoices").delete().match({ id });
    if (error) {
      toast.error("Something went wrong");
      console.log(error);
    } else {
      toast.success("Invoice deleted successfully");
      getInvoices();
    }
  }

  async function editInvoice(id) {
    console.log(id);
  }

  useEffect(() => {
    getInvoices();
    getItems();
  }, []);

  return (
    <>
      <div className="max-w-4xl m-auto py-6">
        <Header setOpen={setOpenSlideover} />
        <Table invoices={invoices} deleteInvoice={deleteInvoice} editInvoice={editInvoice} items={items} setItems={setItems} getItems={getItems} />
      </div>
      <Slideover
        handleSubmit={generateNewInvoice}
        form={form}
        setForm={setForm}
        open={openSlideover}
        setOpen={setOpenSlideover}
        itemList={itemList}
        setItemList={setItemList}
      />
      <Toaster />
    </>
  );
}
