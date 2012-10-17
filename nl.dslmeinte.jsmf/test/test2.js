(function() {

	var metaModelJSON = [ {
		"_class" : "Datatype",
		"name" : "String"
	}, {
		"_class" : "Class",
		"name" : "Statemachine",
		"features" : [ {
			"name" : "name",
			"kind" : "attribute",
			"lowerLimit" : 1,
			"upperLimit" : 1,
			"type" : "String"
		}, {
			"name" : "variables",
			"kind" : "containment",
			"type" : "Variable"
		}, {
			"name" : "triggers",
			"kind" : "containment",
			"type" : "Trigger"
		}, {
			"name" : "states",
			"kind" : "containment",
			"type" : "State"
		} ]
	}, {
		"_class" : "Class",
		"name" : "Variable",
		"features" : [ {
			"name" : "name",
			"kind" : "attribute",
			"lowerLimit" : 1,
			"upperLimit" : 1,
			"type" : "String"
		} ]
	}, {
		"_class" : "Class",
		"name" : "Trigger",
		"features" : [ {
			"name" : "name",
			"kind" : "attribute",
			"lowerLimit" : 1,
			"upperLimit" : 1,
			"type" : "String"
		} ]
	}, {
		"_class" : "Class",
		"name" : "State",
		"abstract" : true,
		"features" : [ {
			"name" : "name",
			"kind" : "attribute",
			"lowerLimit" : 1,
			"upperLimit" : 1,
			"type" : "String"
		}, {
			"name" : "transitions",
			"kind" : "containment",
			"upperLimit" : -1,
			"type" : "Transition"
		} ]
	}, {
		"_class" : "Class",
		"name" : "SimpleState",
		"superTypes" : [ "State" ]
	}, {
		"_class" : "Class",
		"name" : "CompositeState",
		"superTypes" : [ "State" ],
		"features" : [ {
			"name" : "subStates",
			"kind" : "containment",
			"upperLimit" : -1,
			"type" : "State"
		} ]
	}, {
		"_class" : "Class",
		"name" : "Transition",
		"features" : [ {
			"name" : "targetState",
			"kind" : "reference",
			"lowerLimit" : 1,
			"upperLimit" : 1,
			"type" : "State"
		}, {
			"name" : "triggers",
			"kind" : "reference",
			"upperLimit" : -1,
			"type" : "Trigger"
		}, {
			"name" : "condition",
			"kind" : "containment",
			"upperLimit" : 1,
			"type" : "Expression"
		} ]
	}, {
		"_class" : "Class",
		"name" : "Expression"
	}, {
		"_class" : "Class",
		"name" : "AndExpression",
		"superTypes" : [ "Expression" ],
		"features" : [ {
			"name" : "expr1",
			"kind" : "containment",
			"lowerLimit" : 1,
			"upperLimit" : -1,
			"type" : "Expression"
		}, {
			"name" : "expr2",
			"kind" : "containment",
			"lowerLimit" : 1,
			"upperLimit" : -1,
			"type" : "Expression"
		} ]
	}, {
		"_class" : "Class",
		"name" : "OrExpression",
		"superTypes" : [ "Expression" ],
		"features" : [ {
			"name" : "expr1",
			"kind" : "containment",
			"lowerLimit" : 1,
			"upperLimit" : -1,
			"type" : "Expression"
		}, {
			"name" : "expr2",
			"kind" : "containment",
			"lowerLimit" : 1,
			"upperLimit" : -1,
			"type" : "Expression"
		} ]
	}, {
		"_class" : "Class",
		"name" : "NotExpression",
		"superTypes" : [ "Expression" ],
		"features" : [ {
			"name" : "expr",
			"kind" : "containment",
			"lowerLimit" : 1,
			"upperLimit" : -1,
			"type" : "Expression"
		} ]
	}, {
		"_class" : "Class",
		"name" : "VarRef",
		"superTypes" : [ "Expression" ],
		"features" : [ {
			"name" : "variable",
			"kind" : "reference",
			"lowerLimit" : 1,
			"upperLimit" : 1,
			"type" : "Variable"
		} ]
	} ];

	var modelJSON = [ {
		"_class" : "Statemachine",
		"name" : "AC",
		"triggers" : [ {
			"_class" : "Trigger",
			"name" : "OnButton"
		}, {
			"_class" : "Trigger",
			"name" : "ModeButton"
		} ],
		"states" : [ {
			"_class" : "SimpleState",
			"name" : "Off",
			"transitions" : [ {
				"_class" : "Transition",
				"targetState" : "/AC.states/On",
				"triggers" : [ "/AC.triggers/OnButton" ]
			} ]
		}, {
			"_class" : "CompositeState",
			"name" : "On",
			"subStates" : [ {
				"_class" : "SimpleState",
				"name" : "Heating",
				"transitions" : [ {
					"_class" : "Transition",
					"targetState" : "/AC.states/On.subStates/Cooling",
					"triggers" : [ "/AC.triggers/ModeButton" ]
				} ]
			}, {
				"_class" : "SimpleState",
				"name" : "Cooling",
				"transitions" : [ {
					"_class" : "Transition",
					"targetState" : "/AC.states/On.subStates/Heating",
					"triggers" : [ "/AC.triggers/ModeButton" ]
				} ]
			} ],
			"transitions" : [ {
				"_class" : "Transition",
				"targetState" : "/AC.states/Off",
				"triggers" : [ "/AC.triggers/OnButton" ]
			} ]
		} ]
	} ];

	var modelJSONWithoutShortcuts = [ {
		"_class" : "Statemachine",
		"name" : "AC",
		"triggers" : [ {
			"_class" : "Trigger",
			"name" : "OnButton"
		}, {
			"_class" : "Trigger",
			"name" : "ModeButton"
		} ],
		"states" : [ {
			"_class" : "SimpleState",
			"name" : "Off",
			"transitions" : [ {
				"_class" : "Transition",
				"targetState" : "/AC.states/On",
				"triggers" : [ "/AC.triggers/OnButton" ]
			} ]
		}, {
			"_class" : "CompositeState",
			"name" : "On",
			"subStates" : [ {
				"_class" : "SimpleState",
				"name" : "Heating",
				"transitions" : [ {
					"_class" : "Transition",
					"targetState" : "/AC.states/On.subStates/Cooling",
					"triggers" : [ "/AC.triggers/ModeButton" ]
				} ]
			}, {
				"_class" : "SimpleState",
				"name" : "Cooling",
				"transitions" : [ {
					"_class" : "Transition",
					"targetState" : "/AC.states/On.subStates/Heating",
					"triggers" : [ "/AC.triggers/ModeButton" ]
				} ]
			} ],
			"transitions" : [ {
				"_class" : "Transition",
				"targetState" : "/AC.states/Off",
				"triggers" : [ "/AC.triggers/OnButton" ]
			} ]
		} ]
	} ];

	test("initialising statemachine meta model and example model (test2.js)", function() {
			var metaModel = jsmf.meta.createMetaModelFromJSON(metaModelJSON);
			ok(metaModel, "statemachine meta model initialised");
			var modelResource = jsmf.model.Factory.createMResource(modelJSON, metaModel);
			ok(modelResource, "example model initialised");
			var statemachine = modelResource.contents.at(0);
			var states = statemachine.get("states");
			var offState = states.at(0);
			var onState = states.at(1);
			var transition0 = offState.get("transitions").at(0);
			var referencedState = transition0.get("targetState");
			ok( referencedState === onState, "reference to On state resolved correctly");
			var json = modelResource.toJSON();
			deepEqual(json, modelJSONWithoutShortcuts, "serialized model equals sanitized original JSON");
		});

})();
