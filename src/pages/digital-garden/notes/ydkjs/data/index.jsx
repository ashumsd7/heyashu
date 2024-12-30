'use client'
import { NAMSTE_NODE_JS_S1_ALL_IN_ONE } from "@/data/note/namaste-node-js-s1/constant";
import React from "react";
import { JSONTree } from 'react-json-tree';
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';
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
      {" "}
      {/* <JSONTree data={NAMSTE_NODE_JS_S1_ALL_IN_ONE} invertTheme={false}  /> */}
      <JsonView value={NAMSTE_NODE_JS_S1_ALL_IN_ONE} />
    </div>
  );
}

export default index;
