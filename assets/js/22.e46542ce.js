(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{406:function(t,s,e){"use strict";e.r(s);var a=e(27),r=Object(a.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"utility"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#utility"}},[t._v("#")]),t._v(" Utility")]),t._v(" "),e("p",[t._v("The following RPC calls interact with the Tokel blockchain daemon, and are made available through the "),e("code",[t._v("tokel-cli")]),t._v(" software.")]),t._v(" "),e("p",[t._v("The Tokel blockchain inherits all Komodo smartchain RPC's, but not all RPC's are enabled. For simplicity, our documentation only shows those commands that are enabled and available for use.")]),t._v(" "),e("h2",{attrs:{id:"createmultisig"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#createmultisig"}},[t._v("#")]),t._v(" createmultisig")]),t._v(" "),e("p",[e("strong",[t._v('createmultisig nrequired [ "key", ... ]')])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("createmultisig")]),t._v(" method creates a multi-signature address with "),e("code",[t._v("n")]),t._v(" signature(s) of "),e("code",[t._v("m")]),t._v(" key(s) required. The method returns a json object with the address and redeemScript.")]),t._v(" "),e("h3",{attrs:{id:"arguments"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("number_required")]),t._v(" "),e("td",[t._v("(numeric, required)")]),t._v(" "),e("td",[t._v("the number of required signatures out of the "),e("code",[t._v("n")]),t._v(" key(s) or address(es)")])]),t._v(" "),e("tr",[e("td",[t._v('"keys"')]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("a json array of keys which are addresses or hex-encoded public keys")])]),t._v(" "),e("tr",[e("td",[t._v('"key"')]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("an address or hex-encoded public key")])])])]),t._v(" "),e("h3",{attrs:{id:"response"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v('"address"')]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("the value of the new multisig address")])]),t._v(" "),e("tr",[e("td",[t._v('"redeemScript"')]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("the string value of the hex-encoded redemption script")])])])]),t._v(" "),e("h4",{attrs:{id:"examples"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli createmultisig "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"['),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("RJnVEQgucK1iwiRjfTZmreXkF49KgTErDn"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(","),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("RCVyjn9MQ8Tw6YRJnDcsx67kfsmfUgLdfw"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(']"')]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"address"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bZjsy6bt2ZdyHV5hfCNL2HsuA4eV63s5u6"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"redeemScript"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"52210384c0db4f1eaa142a2745742b942f989375dbec32c55310a793225bb5c43cdc9821021f527b7269ab18da85a50b7f45f572e8b017fce476de06cb80a2550ee7d4b11652ae"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),e("p",[t._v("You can find the "),e("code",[t._v("rpcuser")]),t._v(", "),e("code",[t._v("rpcpassword")]),t._v(", and "),e("code",[t._v("rpcport")]),t._v(" in the coin's "),e("code",[t._v(".conf")]),t._v(" file.")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" --user "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcuser")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcpassword")]),t._v(" --data-binary "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{"jsonrpc": "1.0", "id":"curltest", "method": "createmultisig", "params": [2, ["RJnVEQgucK1iwiRjfTZmreXkF49KgTErDn","RCVyjn9MQ8Tw6YRJnDcsx67kfsmfUgLdfw"]] }\'')]),t._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'content-type: text/plain;'")]),t._v(" http://127.0.0.1:"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcport")]),t._v("/\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"result"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"address"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bNnKtDC6UuSt5kGJewCQ5b2BhzFK3HTQUV"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"redeemScript"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"522103ae084021ff011b527c34914d2c40148080c09254dd3c7d1f31f32549b53ccd232103bee23783f726ba81b5977473b172497260d9c261b9ef9f5a9dd51c545c8db0ac52ae"')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"error"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"curltest"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),e("h2",{attrs:{id:"decodeccopret"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#decodeccopret"}},[t._v("#")]),t._v(" decodeccopret")]),t._v(" "),e("p",[e("strong",[t._v("decodeccopret scriptPubKey")])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("decodeccopret")]),t._v(" method decodes the OP RETURN data from a CC transaction to output the "),e("code",[t._v("EVALCODE")]),t._v(" and "),e("code",[t._v("function id")]),t._v(" of the method that produced the transaction.")]),t._v(" "),e("h4",{attrs:{id:"finding-the-op-return-data-from-a-cc-transaction"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#finding-the-op-return-data-from-a-cc-transaction"}},[t._v("#")]),t._v(" Finding the OP RETURN Data From a CC Transaction")]),t._v(" "),e("p",[t._v("The OP RETURN data from a CC transaction can be found by following these steps:")]),t._v(" "),e("ul",[e("li",[t._v("Decode a transaction produced by a CC module using the method "),e("RouterLink",{attrs:{to:"/basic-docs/smart-chains/smart-chain-api/rawtransactions.html#getrawtransaction"}},[t._v("getrawtransaction")]),t._v("'s verbose option.")],1),t._v(" "),e("li",[t._v("Look for the "),e("code",[t._v("vout")]),t._v(" key; it is an array of jsons")]),t._v(" "),e("li",[t._v("Find the json that contains the "),e("code",[t._v("scriptPubkey")]),t._v(", and which has the "),e("code",[t._v("type:nulldata")]),t._v(" key pair")]),t._v(" "),e("li",[t._v("Copy the "),e("code",[t._v("hex")]),t._v(" value from that "),e("code",[t._v("scriptPubkey")]),t._v(" json")]),t._v(" "),e("li",[t._v("This is the hex-string that is expected as the argument for the above method.")]),t._v(" "),e("li",[t._v("You can verify that the transaction was produced by a CC module by checking if one of the "),e("code",[t._v("vout")]),t._v(" json's "),e("code",[t._v("scriptPubkey")]),t._v(" json has the "),e("code",[t._v("type:cryptocondition")]),t._v(" key pair")])]),t._v(" "),e("h3",{attrs:{id:"arguments-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-2"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("scriptPubKey")]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("the hex-string format "),e("code",[t._v("scriptPubKey")]),t._v(" of the "),e("code",[t._v("type")]),t._v(" : "),e("code",[t._v("nulldata")]),t._v(" in the "),e("code",[t._v("vout")]),t._v(" of a transaction produced by a CC module")])])])]),t._v(" "),e("h3",{attrs:{id:"response-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-2"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("result")]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("whether the call succeeded")])]),t._v(" "),e("tr",[e("td",[t._v("OpRets")]),t._v(" "),e("td",[t._v("(json)")]),t._v(" "),e("td",[t._v("a json containing the keys "),e("code",[t._v("EVALCODE")]),t._v(" and "),e("code",[t._v("function id")])])]),t._v(" "),e("tr",[e("td",[t._v("eval_code")]),t._v(" "),e("td",[t._v("(hexadecimal number)")]),t._v(" "),e("td",[t._v("the "),e("code",[t._v("EVALCODE")]),t._v(" of the method that produced the transaction")])]),t._v(" "),e("tr",[e("td",[t._v("function")]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("the "),e("code",[t._v("function id")]),t._v(" of the method that produced the transaction")])])])]),t._v(" "),e("h4",{attrs:{id:"examples-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-2"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli decodeccopret 6a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"result"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"success"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OpRets"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"eval_code"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x12"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"function"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"x"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),e("p",[t._v("You can find the "),e("code",[t._v("rpcuser")]),t._v(", "),e("code",[t._v("rpcpassword")]),t._v(", and "),e("code",[t._v("rpcport")]),t._v(" in the coin's "),e("code",[t._v(".conf")]),t._v(" file.")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" --user "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcuser")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcpassword")]),t._v(" --data-binary "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{"jsonrpc": "1.0", "id":"curltest", "method": "decodeccopret", "params": ["6a2412782103d31479e789014a96ba6dd60d50210045aa8292fe693f293d44615929f04cf57a"] }\'')]),t._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'content-type: text/plain;'")]),t._v(" http://127.0.0.1:"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcport")]),t._v("/\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"result"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"result"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"success"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"OpRets"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"eval_code"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0x12"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"function"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"x"')]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"error"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"curltest"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),e("h2",{attrs:{id:"estimatefee"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#estimatefee"}},[t._v("#")]),t._v(" estimatefee")]),t._v(" "),e("p",[e("strong",[t._v("estimatefee nblocks")])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("estimatefee")]),t._v(" method estimates the approximate fee per kilobyte. The method is needed for a transaction to begin confirmation within "),e("code",[t._v("nblocks")]),t._v(" blocks.")]),t._v(" "),e("p",[t._v("The value "),e("code",[t._v("-1.0")]),t._v(" is returned if not enough transactions and blocks have been observed to make an estimate.")]),t._v(" "),e("h3",{attrs:{id:"arguments-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-3"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("nblocks")]),t._v(" "),e("td",[t._v("(numeric)")]),t._v(" "),e("td",[t._v("the number of blocks within which the fee should be tested")])])])]),t._v(" "),e("h3",{attrs:{id:"response-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-3"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("n")]),t._v(" "),e("td",[t._v("(numeric)")]),t._v(" "),e("td",[t._v("the estimated fee")])])])]),t._v(" "),e("h4",{attrs:{id:"examples-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-3"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli estimatefee "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.00019376")]),t._v("\n")])])])]),t._v(" "),e("h2",{attrs:{id:"estimatepriority"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#estimatepriority"}},[t._v("#")]),t._v(" estimatepriority")]),t._v(" "),e("p",[e("strong",[t._v("estimatepriority nblocks")])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("estimatepriority")]),t._v(" method estimates the approximate priority of a zero-fee transaction, when it needs to begin confirmation within "),e("code",[t._v("nblocks")]),t._v(" blocks.")]),t._v(" "),e("p",[t._v("The value "),e("code",[t._v("-1.0")]),t._v(" is returned if not enough transactions and blocks have been observed to make an estimate.")]),t._v(" "),e("h3",{attrs:{id:"arguments-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-4"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("nblocks")]),t._v(" "),e("td",[t._v("(numeric)")]),t._v(" "),e("td",[t._v("a statement indicating within how many blocks the transaction should be confirmed")])])])]),t._v(" "),e("h3",{attrs:{id:"response-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-4"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("n")]),t._v(" "),e("td",[t._v("(numeric)")]),t._v(" "),e("td",[t._v("the estimated priority")])])])]),t._v(" "),e("h4",{attrs:{id:"examples-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-4"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli estimatepriority "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("-1\n")])])])]),t._v(" "),e("h2",{attrs:{id:"invalidateblock"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#invalidateblock"}},[t._v("#")]),t._v(" invalidateblock")]),t._v(" "),e("p",[e("strong",[t._v('invalidateblock "hash"')])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("invalidateblock")]),t._v(" method permanently marks a block as invalid, as if it violated a consensus rule.")]),t._v(" "),e("h3",{attrs:{id:"arguments-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-5"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("hash")]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("the hash of the block to mark as invalid")])])])]),t._v(" "),e("h3",{attrs:{id:"response-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-5"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("(none)")]),t._v(" "),e("td"),t._v(" "),e("td")])])]),t._v(" "),e("h4",{attrs:{id:"examples-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-5"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli invalidateblock "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"')]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("none"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])]),t._v(" "),e("p",[t._v("You can find the "),e("code",[t._v("rpcuser")]),t._v(", "),e("code",[t._v("rpcpassword")]),t._v(", and "),e("code",[t._v("rpcport")]),t._v(" in the coin's "),e("code",[t._v(".conf")]),t._v(" file.")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" --user "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcuser")]),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcpassword")]),t._v(" --data-binary "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('\'{"jsonrpc": "1.0", "id":"curltest", "method": "invalidateblock", "params": ["02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"] }\'')]),t._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'content-type: text/plain;'")]),t._v(" http://127.0.0.1:"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$rpcport")]),t._v("/\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"result"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"error"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"curltest"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),e("h2",{attrs:{id:"reconsiderblock"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reconsiderblock"}},[t._v("#")]),t._v(" reconsiderblock")]),t._v(" "),e("p",[e("strong",[t._v('reconsiderblock "hash"')])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("reconsiderblock")]),t._v(" method removes invalidity status of a block and its descendants, reconsidering them for activation. This can be used to undo the effects of the "),e("code",[t._v("invalidateblock")]),t._v(" method.")]),t._v(" "),e("h3",{attrs:{id:"arguments-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-6"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("hash")]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("the hash of the block to reconsider")])])])]),t._v(" "),e("h3",{attrs:{id:"response-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-6"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("(none)")]),t._v(" "),e("td"),t._v(" "),e("td")])])]),t._v(" "),e("h4",{attrs:{id:"examples-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-6"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli reconsiderblock "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"02f51fb2793b0728050c5e983ffed669594e0a2dda01dcb7a68d129fd87436e0"')]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("none"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])]),t._v(" "),e("h2",{attrs:{id:"txnotarizedconfirmed"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#txnotarizedconfirmed"}},[t._v("#")]),t._v(" txnotarizedconfirmed")]),t._v(" "),e("p",[e("strong",[t._v("txnotarizedconfirmed txid")])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("txnotarizedconfirmed")]),t._v(" method returns information about a transaction's state of confirmation.")]),t._v(" "),e("p",[t._v("If the transaction is on a chain that has Komodo's dPoW security service, the method returns "),e("code",[t._v("true")]),t._v(" if the transaction is notarized.")]),t._v(" "),e("p",[t._v("Tokel is protected by Komodo's dPoW security service.")]),t._v(" "),e("h3",{attrs:{id:"arguments-7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-7"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v('"txid"')]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("the transaction id")])])])]),t._v(" "),e("h3",{attrs:{id:"response-7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-7"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v('"result"')]),t._v(" "),e("td",[t._v("(boolean)")]),t._v(" "),e("td",[t._v("whether the transaction is confirmed, for dPoW-based chains; for non-dPoW chains, the value indicates whether the transaction has "),e("code",[t._v("60")]),t._v(" or more confirmations")])])])]),t._v(" "),e("h4",{attrs:{id:"examples-7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-7"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli txnotarizedconfirmed ce1e3df1fb24ab3301b4032c3a0af466ca03b9365f8c649511bdd72f5519fecb\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"result"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),e("h2",{attrs:{id:"validateaddress"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#validateaddress"}},[t._v("#")]),t._v(" validateaddress")]),t._v(" "),e("p",[e("strong",[t._v('validateaddress "tokeladdress"')])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("validateaddress")]),t._v(" method returns information about the given address.")]),t._v(" "),e("h3",{attrs:{id:"arguments-8"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-8"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v('"address"')]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("the address to validate")])])])]),t._v(" "),e("h3",{attrs:{id:"response-8"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-8"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v('"isvalid"')]),t._v(" "),e("td",[t._v("(boolean)")]),t._v(" "),e("td",[t._v("indicates whether the address is valid. If it is not, this is the only property returned.")])]),t._v(" "),e("tr",[e("td",[t._v('"address"')]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("the address validated")])]),t._v(" "),e("tr",[e("td",[t._v('"scriptPubKey"')]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("the hex encoded scriptPubKey generated by the address")])]),t._v(" "),e("tr",[e("td",[t._v('"ismine"')]),t._v(" "),e("td",[t._v("(boolean)")]),t._v(" "),e("td",[t._v("indicates whether the address is yours")])]),t._v(" "),e("tr",[e("td",[t._v('"isscript"')]),t._v(" "),e("td",[t._v("(boolean)")]),t._v(" "),e("td",[t._v("whether the key is a script")])]),t._v(" "),e("tr",[e("td",[t._v('"pubkey"')]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v("the hex value of the raw public key")])]),t._v(" "),e("tr",[e("td",[t._v('"iscompressed"')]),t._v(" "),e("td",[t._v("(boolean)")]),t._v(" "),e("td",[t._v("whether the address is compressed")])]),t._v(" "),e("tr",[e("td",[t._v('"account"')]),t._v(" "),e("td",[t._v("(string)")]),t._v(" "),e("td",[t._v('DEPRECATED the account associated with the address; "" is the default account')])])])]),t._v(" "),e("h4",{attrs:{id:"examples-8"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-8"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli validateaddress "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7"')]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isvalid"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"address"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"RDNC9mLrN48pVGDQ5jSoPb2nRsUPJ5t2R7"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scriptPubKey"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"76a9142cd2a4e3d1c2738ee4fce61e73ea822dcaacb9b488ac"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"segid"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"ismine"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"iswatchonly"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"isscript"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"pubkey"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"03c376b00b3a2ae43b8bf103a6c6962b241de684383301fe628a460b68a79ac1d8"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"iscompressed"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"account"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])]),t._v(" "),e("h2",{attrs:{id:"verifymessage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#verifymessage"}},[t._v("#")]),t._v(" verifymessage")]),t._v(" "),e("p",[e("strong",[t._v('verifymessage "address" "signature" "message"')])]),t._v(" "),e("p",[t._v("The "),e("code",[t._v("verifymessage")]),t._v(" method verifies a signed message.")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("See also "),e("b",[t._v("signmessage")]),t._v(".")])]),t._v(" "),e("h3",{attrs:{id:"arguments-9"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#arguments-9"}},[t._v("#")]),t._v(" Arguments")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v('"address"')]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("the address to use for the signature")])]),t._v(" "),e("tr",[e("td",[t._v('"signature"')]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("the signature provided by the signer in base 64 encoding")])]),t._v(" "),e("tr",[e("td",[t._v('"message"')]),t._v(" "),e("td",[t._v("(string, required)")]),t._v(" "),e("td",[t._v("the message that was signed")])])])]),t._v(" "),e("h3",{attrs:{id:"response-9"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#response-9"}},[t._v("#")]),t._v(" Response")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("true/false")]),t._v(" "),e("td",[t._v("(boolean)")]),t._v(" "),e("td",[t._v("indicates whether the signature is verified")])])])]),t._v(" "),e("h4",{attrs:{id:"examples-9"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#examples-9"}},[t._v("#")]),t._v(" 📌 Examples")]),t._v(" "),e("p",[t._v("Create the signature:")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli signmessage "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"my message"')]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n")])])])]),t._v(" "),e("p",[t._v("Verify the signature:")]),t._v(" "),e("p",[t._v("Command:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("./tokel-cli verifymessage "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"H1y0mn/wRv56r1bcfkbQtzjG6XeWSelAsyayBuCwEL9XGXs7ieU55dryt/cFWM9gnRFI7gS01AByuSqRs+o/AZs="')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"my message"')]),t._v("\n")])])]),e("collapse-text",{attrs:{hidden:"",title:"Response"}},[e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n")])])])])],1)}),[],!1,null,null,null);s.default=r.exports}}]);