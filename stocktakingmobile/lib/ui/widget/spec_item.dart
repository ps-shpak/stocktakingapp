import 'package:flutter/widgets.dart';

class SpecItem extends StatelessWidget {
  SpecItem({icon: Widget, text: Widget})
      : this.icon = icon,
        this.text = text,
        super();

  final Widget icon;
  final Widget text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          icon,
          Padding(
            padding: EdgeInsets.only(
              left: 6,
            ),
            child: text,
          ),
        ],
      ),
    );
  }
}
