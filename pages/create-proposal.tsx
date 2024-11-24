"use client";

import Layout from "@/components/Layout";
import Link from "next/link";
import TransactionList from "@/components/Transactions/TransactionList";
import MarkdownEditor from "@/components/MarkdownEditor";
import SubmitButton, { FormTransaction } from "@/components/SubmitButton";
import { Formik, Form, Field } from "formik";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export interface Values {
  title: string;
  summary: string;
  transactions: FormTransaction[]; // Use the updated FormTransaction interface
}

export default function Create() {
  const [initialValues, setInitialValues] = useState<Values | null>(null);

  useEffect(() => {
    setInitialValues({ title: "My New Proposal", transactions: [], summary: "" });
  }, []);

  if (!initialValues) {
    return null;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="max-w-[650px] w-full">
          <div className="flex items-center">
            <Link
              href="/vote"
              className="flex items-center border border-skin-stroke hover:bg-skin-muted rounded-full p-2 mr-4"
            >
              <ArrowLeftIcon className="h-4" />
            </Link>

            <div className="text-2xl sm:text-4xl font-bold relative font-heading text-skin-base">
              Create your proposal
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              console.log("Submitted Proposal", values); // Replace with API call
            }}
          >
            {({ values, setFieldValue }) => ( // <-- Destructure setFieldValue here
              <Form className="mt-6 flex flex-col w-full">
                <label className="relative text-md font-heading text-skin-base">
                  Proposal Title
                </label>

                <Field
                  name="title"
                  type="text"
                  className="bg-skin-muted text-skin-base placeholder:text-skin-muted px-3 py-3 rounded-lg w-full text-md mt-2 border-amber-400 border"
                />

                <label className="relative text-md font-heading text-skin-base mt-6">
                  Transactions
                </label>

                <TransactionList values={values} />

                <label className="relative text-md font-heading text-skin-base mt-6">
                  Summary
                </label>

                <MarkdownEditor
                  value={values.summary}
                  onChange={(markdown) => setFieldValue("summary", markdown)} // Update the summary field
                />
                <SubmitButton />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
