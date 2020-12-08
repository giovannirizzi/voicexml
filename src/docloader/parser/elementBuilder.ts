'use strict';

import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';
import * as Elements from '../../elements';

const ELEMENTS = {
	// VoiceNodes Tags
	//[Elements.Assign.TAG_NAME]: Elements.Assign,
	[Elements.Block.TAG_NAME]: Elements.Block,
	// [Nodes.Catch.TAG_NAME]: Nodes.Catch,
	// [Nodes.Choice.TAG_NAME]: Nodes.Choice,
	// [Nodes.Clear.TAG_NAME]: Nodes.Clear,
	// [Nodes.Data.TAG_NAME]: Nodes.Data,
	// [Nodes.Disconnect.TAG_NAME]: Nodes.Disconnect,
	// [Nodes.Else.TAG_NAME]: Nodes.Else,
	// [Nodes.Elseif.TAG_NAME]: Nodes.Elseif,
	// [Nodes.Enumerate.TAG_NAME]: Nodes.Enumerate,
	// [Nodes.ErrorTag.TAG_NAME]: Nodes.Org,
	// [Nodes.Exit.TAG_NAME]: Nodes.Exit,
	// [Nodes.Field.TAG_NAME]: Nodes.Field,
	// [Nodes.Filled.TAG_NAME]: Nodes.Filled,
	[Elements.Form.TAG_NAME]: Elements.Dialog,
	// [Nodes.Foreach.TAG_NAME]: Nodes.Foreach,
	//[Elements.Goto.TAG_NAME]: Elements.Goto,
	// [Nodes.Grammar.TAG_NAME]: Nodes.Grammar,
	// [Nodes.Help.TAG_NAME]: Nodes.Help,
	// [Nodes.If.TAG_NAME]: Nodes.If,
	// [Nodes.Initial.TAG_NAME]: Nodes.Initial,
	// [Nodes.Link.TAG_NAME]: Nodes.Link,
	// [Nodes.Log.TAG_NAME]: Nodes.Log,
	// [Nodes.Menu.TAG_NAME]: Nodes.Menu,
	// [Nodes.Meta.TAG_NAME]: Nodes.Meta,
	// [Nodes.Metadata.TAG_NAME]: Nodes.Metadata,
	// [Nodes.Noinput.TAG_NAME]: Nodes.Noinput,
	// [Nodes.Nomatch.TAG_NAME]: Nodes.Nomatch,
	// [Nodes.ObjectTag.TAG_NAME]: Nodes.Objecttag,
	// [Nodes.Option.TAG_NAME]: Nodes.Option,
	// [Nodes.Param.TAG_NAME]: Nodes.Param,
	[Elements.Prompt.TAG_NAME]: Elements.Prompt,
	// [Nodes.Property.TAG_NAME]: Nodes.Property,
	// [Nodes.Record.TAG_NAME]: Nodes.Record,
	// [Nodes.Reprompt.TAG_NAME]: Nodes.Reprompt,
	// [Nodes.Return.TAG_NAME]: Nodes.Return,
	//[Elements.Script.TAG_NAME]: Elements.Script,
	// [Nodes.Subdialog.TAG_NAME]: Nodes.Subdialog,
	// [Nodes.Submit.TAG_NAME]: Nodes.Submit,
	// [Nodes.Throw.TAG_NAME]: Nodes.Throw,
	// [Nodes.Transfer.TAG_NAME]: Nodes.Transfer,
	[Elements.Value.TAG_NAME]: Elements.Value,
	[Elements.Var.TAG_NAME]: Elements.Var,
	[Elements.Vxml.TAG_NAME]: Elements.Vxml,
	// // SSML Tags
	// [Nodes.Audio.TAG_NAME]: Nodes.Audio,
	// [Nodes.Break.TAG_NAME]: Nodes.Break,
	// [Nodes.Desc.TAG_NAME]: Nodes.Desc,
	// [Nodes.Emphasis.TAG_NAME]: Nodes.Emphasis,
	// [Nodes.Lexicon.TAG_NAME]: Nodes.Lexicon,
	// [Nodes.Mark.TAG_NAME]: Nodes.Mark,
	// [Nodes.P.TAG_NAME]: Nodes.P,
	// [Nodes.Phoneme.TAG_NAME]: Nodes.Phoneme,
	// [Nodes.Prosody.TAG_NAME]: Nodes.Prosody,
	// [Nodes.S.TAG_NAME]: Nodes.S,
	// [Nodes.Sayas.TAG_NAME]: Nodes.Sayas,
	// [Nodes.Sub.TAG_NAME]: Nodes.Sub,
	// [Nodes.Voice.TAG_NAME]: Nodes.Voice,
	// // SRGS Tags
	// [Nodes.Example.TAG_NAME]: Nodes.Example,
	// [Nodes.Item.TAG_NAME]: Nodes.Item,
	// [Nodes.Oneof.TAG_NAME]: Nodes.Oneof,
	// [Nodes.Rule.TAG_NAME]: Nodes.Rule,
	// [Nodes.Ruleref.TAG_NAME]: Nodes.Ruleref,
	// [Nodes.Tag.TAG_NAME]: Nodes.Tag,
	// [Nodes.Token.TAG_NAME]: Nodes.Token,
	// // Generic XML Tags
	[Elements.Text.TAG_NAME]: Elements.Text
}

function elementBuilder(node : any) : Elements.Element{

	const tagName = node['#name'] as string;
	const className = ELEMENTS[tagName];

	if(className === Elements.Text){

		let t : Elements.Text = new Elements.Text(tagName, {}, []);
		t.text = node.text;
		return t;
	}
	else if(className != null){ //if its a valid element

		//recursive call elementBuilder on children
		var children = node.hasOwnProperty("children") ? node.children.map(elementBuilder) : {};

		var attrs = node.hasOwnProperty("attrs") ? node.attrs : {};
		
		return new className(tagName, attrs, children) as Elements.Element;
	}
	else{
		return new Elements.Element("not_supported", {}, []);
	}
}

export = elementBuilder;

