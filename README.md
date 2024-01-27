<h3 align="center">Fingerprint Integrity Analysis</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
</div>

---

<p align="center"> This Python script performs fingerprint matching using the SIFT (Scale-Invariant Feature Transform) algorithm. 
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Important Note](#imp)
- [Getting Started](#getting_started)
- [Authors](#authors)
- [License](#license)

## 🧐 About <a name = "about"></a>
This project compares a sample fingerprint image with a set of real fingerprint images and determines the best match based on the number of keypoints and their matches.

## Important Note <a name= "about"></a>
I have not included the dataset files in this. You have to download the dataset seperately with the link provided below. The dataset is very massive thus the script is currently configured to compare the sample fingerprint image with the first 1000 real fingerprint images in the "SOCOFing/Real" directory.

### Directory Structure

This is roughly how your project directory should like :

- main.py
- SOCOFing/
  - Altered/
    - Altered-Easy/
      - 140__F_Left_index_finger_CR.BMP
    - Altered-Medium/
      - .....
    - Altered-Hard/
       - ... 
  - Real/
    - Fingerprint_Image_1.jpg
    - Fingerprint_Image_2.jpg
    - ...

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
### Prerequisites
What things you need to install for this project and how to install them.

```
OpenCV (cv2) library
Python 3.x
```
### Datasets Used
The following dataset needs to be installed before running the code

 - Sokoto Coventry Fingerprint Dataset (SOCOFing) : https://www.kaggle.com/datasets/ruizgara/socofing


### Installing
The following commands can be used to install the prerequisites and run the code.

1) Install Dependencies

```
pip install opencv-python
```

2) Clone the repository

```
git clone https://github.com/ShreyasShende3/Fingerprint-Integrity-Analysis
```
3) After cloning change the directory to the directory name

```
cd Fingerprint-Integrity-Analysis
```

### Usage

1) Place the dataset files in the same directory as the Python code.

2) Run the Python script:

```
python main.py
```
### Issue

As you are using cv2 sometimes you might face some errors like cv2.imread or some other function is not detected. 
```
In this case you can downgrade the opencv-python version. This might just solve the issue.
```
You should see the following output:
![Output](https://github.com/ShreyasShende3/Fingerprint-Integrity-Analysis/blob/main/Fingerprint_output.png)

## ✍️ Authors <a name = "authors"></a>
- [@Shreyas](https://github.com/ShreyasShende3)
- [@Atharva](https://github.com/EuroNOX)

## License <a name = "license"></a>
GNU General Public License v3.0
