import tensorflow as tf
import sys
import json

def train_model(learning_rate=0.001, epochs=5):
    # Load the MNIST dataset
    mnist = tf.keras.datasets.mnist
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0  # Normalize pixel values to [0, 1]

    # Create a simple CNN model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Flatten(input_shape=(28, 28)),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(10, activation='softmax')
    ])

    # Compile the model
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    # Train the model
    history = model.fit(x_train, y_train, epochs=epochs)

    # Save the training results
    with open('training_results.json', 'w') as f:
        json.dump(history.history, f)
    
    # Save the trained model
    model.save('trained_model')

if __name__ == "__main__":
    # Assuming optional command line arguments for learning rate and epochs
    lr = float(sys.argv[1]) if len(sys.argv) > 1 else 0.001
    ep = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    train_model(learning_rate=lr, epochs=ep)
