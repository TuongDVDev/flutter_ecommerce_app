import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onTap;
  const CustomButton({
    Key? key,
    required this.text,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onTap,
      style: ElevatedButton.styleFrom(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(5), // <-- Radius
        ),
        minimumSize: const Size(double.infinity, 50),
        foregroundColor: Colors.white, // Text Color (Foreground color)
        backgroundColor: Colors.blue, // Background color
      ),
      child: Text(
        text,
      ),
    );
  }
}
