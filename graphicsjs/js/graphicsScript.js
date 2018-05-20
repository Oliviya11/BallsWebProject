var stage = acgraph.create("container");
var circlePath = stage.path();
circlePath.circularArc(120, 120, 100, 100, 0, 90);
var text = stage.text(0,0,"Hello world! Hello world! Hello world! Hello world! Hello world! " +
  "Hello world! Hello world! Hello world! Hello world! Hello world!");
text.path(circlePath);
text.color("white");
text.fontSize("15px");
