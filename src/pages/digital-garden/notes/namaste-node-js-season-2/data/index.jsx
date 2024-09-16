'use client'
import { NAMSTE_NODE_JS_S1_ALL_IN_ONE, NAMSTE_NODE_JS_S2_ALL_IN_ONE } from "@/data/note/namaste-node-js-s1/constant";
import React from "react";

import JsonView from '@uiw/react-json-view';

const json = {
  array: [1, 2, 3],
  bool: true,
  object: {
    foo: 'bar',
  },
};
function index() {
  return (
    <div>
      <JsonView value={NAMSTE_NODE_JS_S2_ALL_IN_ONE} />
    </div>
  );
}

export default index;
