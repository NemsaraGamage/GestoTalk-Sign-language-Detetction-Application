### GestoTalk: Gesture-Based Communication Application

**Project Overview:**

GestoTalk is a gesture-based communication application designed to facilitate real-time sign language recognition and interaction through a chatbot interface. The application leverages a hybrid model combining Faster R-CNN, VGG16, and LSTM to accurately detect and interpret sign language gestures.

**Key Features:**

1. **Gesture Recognition:**
   - Utilizes a hybrid model for detecting and recognizing sign language gestures.
   - Supports a limited set of 16 gestures from the American Sign Language (ASL) alphabet.

2. **Real-Time Interaction:**
   - Integrates with a chatbot that receives detected gestures and converts them into text.
   - Users can interact with the chatbot using gestures, enhancing communication for individuals practicing sign language.

3. **User-Friendly Interface:**
   - Provides a web-based application with an intuitive user interface for easy interaction.
   - Allows users to view detected gestures and corresponding text in real-time.

4. **Customizable Input:**
   - Users can manually input text or modify detected gestures before sending them to the chatbot.
   - Includes a button to confirm and send the recognized gesture to the chatbot, preventing overly long sentences from continuous detection.

5. **Future Enhancements:**
   - Plans to expand gesture recognition capabilities to include the entire ASL alphabet.
   - Aims to incorporate dynamic hand gestures for more comprehensive communication options.
   - Future updates may include saving chat history and adding more prompts for the chatbot.

**Technologies Used:**
- **Programming Languages:** Python, JavaScript (React.js)
- **Frameworks and Libraries:** TensorFlow, Dialogflow, Firebase
- **Model Architectures:** Faster R-CNN, VGG16, LSTM
- **Development Tools:** Visual Studio Code, GitHub

**Installation Instructions:**
1. Clone the repository:
   
bash
   git clone https://github.com/username/GestoTalk.git

2. Navigate to the project directory:
   
bash
   cd GestoTalk

3. Install required dependencies:
   
bash
   pip install -r requirements.txt

4. Run the application:
   
bash
   python app.py


**Contributing:**

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
