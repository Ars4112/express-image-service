# Image Storage Service

This project is a microservice designed for storing images in a cloud storage solution. It provides an API for uploading and retrieving images, making it easy to integrate image storage capabilities into applications.

## Project Structure

- **src/**
  - **app.ts**: Entry point of the application. Sets up middleware and routes for handling image upload requests.
  - **controllers/**
    - **imageController.ts**: Exports the `ImageController` class, which contains methods for uploading and retrieving images.
  - **services/**
    - **cloudStorageService.ts**: Exports the `CloudStorageService` class, responsible for saving and retrieving images from cloud storage.
  - **types/**
    - **index.ts**: Exports interfaces `ImageUploadRequest` and `ImageResponse` that define the structure of data for image upload requests and responses.

- **package.json**: Configuration file for npm, listing dependencies and scripts for the project.
- **tsconfig.json**: TypeScript configuration file that defines compilation options and included files.
- **README.md**: Documentation for the project.

## Features

- Upload images to cloud storage.
- Retrieve images by their unique identifier.
- TypeScript support for better development experience.

## Installation

To install the necessary dependencies, run:

```
npm install
```

## Usage

To start the application, use the following command:

```
npm start
```

The service will be available at `http://localhost:3000` (or the port specified in your configuration).

## API Endpoints

- `POST /upload`: Upload an image.
- `GET /image/:id`: Retrieve an image by its ID.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.