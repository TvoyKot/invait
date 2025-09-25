// import React, { Component } from "react";
// import "./buttons.scss";

// class Buttons extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isMoving: true,
//       noBtnPosition: { top, left },
//     };
//     this.wrapperRef = React.createRef();
//     this.noBtnRef = React.createRef();
//   }

//   componentDidMount() {
//     // Установим начальную позицию кнопки «Нет» в координатах внутри .wrapper
//     this.updateNoBtnInitialPosition();
//   }

//   updateNoBtnInitialPosition = () => {
//     const wrapper = this.wrapperRef.current;
//     const noBtn = this.noBtnRef.current;
//     console.log(this.noBtnRef)
//     if (!wrapper || !noBtn) return;

//     const wrapperRect = wrapper.getBoundingClientRect();
//     const btnRect = noBtn.getBoundingClientRect();

//     // Координаты кнопки относительно wrapper
//     const top = btnRect.top - wrapperRect.top;
//     const left = btnRect.left - wrapperRect.left;
//     this.setState({
//       noBtnPosition: { top, left },
//     });
//   };

//   moveNoButton = () => {
//     const wrapper = this.wrapperRef.current; // сюда попадает весь компонент Buttons, .wrapper
//     const noBtn = this.noBtnRef.current;

//     if (!wrapper || !noBtn) return;

//     const wrapperRect = wrapper.getBoundingClientRect();
//     const btnRect = noBtn.getBoundingClientRect();
//     // Максимальное смещение кнопки внутри wrapper, чтобы она не выходила за края:
//     // Отнимаем ширину и высоту кнопки, чтобы кнопка оставалась в пределах wrapper
//     const maxLeft = wrapperRect.width - btnRect.width;
//     const maxTop = wrapperRect.height - btnRect.height - 400;

//     // Формируем случайные координаты внутри wrapper:
//     const left = Math.floor(Math.random() * maxLeft);
//     const top = Math.floor(Math.random() * maxTop);

//     this.setState({ noBtnPosition: { top, left } });
//   };

//   handleMouseEnter = () => {
//     this.setState({ isMoving: true }, () => {
//       this.moveNoButton();
//     });
//   };

//   handleNoClick = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   render() {
//     const { onAnswer } = this.props;
//     const { isMoving, noBtnPosition } = this.state;

//     // Если кнопка двигается, стили absolute + позиция, иначе позиционирование нормальное внутри flex
//     const noBtnStyle = isMoving
//       ? {
//           position: "absolute",
//           top: noBtnPosition.top,
//           left: noBtnPosition.left,
//           transition: "top 0.3s ease, left 0.3s ease",
//           cursor: "pointer",
//           zIndex: 10,
//         }
//       : {
//           position: "relative",
//           cursor: "pointer",
//           transition: "none",
//           zIndex: 1,
//         };

//     return (
//       <div className="wrapper">
//         <div className="inner" ref={this.wrapperRef}>
//           <div className="top">
//             <h1 className="title">Тащи жопку сюда!</h1>
//             <img className="img" src="./winking.png" alt="" />
//             <h2>Кино смотреть</h2>
//           </div>
//           <div className="button-wrapper">
//             <button
//               onClick={() => onAnswer(true)}
//               data-answer="true"
//               className="button"
//             >
//               Да
//             </button>
//             <button
//               ref={this.noBtnRef}
//               style={noBtnStyle}
//               onMouseEnter={this.handleMouseEnter}
//               onClick={this.handleNoClick}
//               data-answer="false"
//               className="button"
//             >
//               Нет
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Buttons;
import React, { Component } from "react";
import "./buttons.scss";

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noBtnPosition: { top: 0, right: 0 },
    };

    this.buttonWrapperRef = React.createRef();
    this.noBtnRef = React.createRef();
  }

  moveNoButton = () => {
    if (!this.buttonWrapperRef.current || !this.noBtnRef.current) return;

    const wrapperRect = this.buttonWrapperRef.current.getBoundingClientRect();
    const btnRect = this.noBtnRef.current.getBoundingClientRect();

    const maxLeft = wrapperRect.width - btnRect.width;
    const maxTop = wrapperRect.height - btnRect.height - 200;

    // Генерируем случайные координаты в пределах wrapper
    const right = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * maxTop);

    this.setState({ noBtnPosition: { top, right } });
  };

  handleNoClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.moveNoButton();
  };

  render() {
    const { onAnswer } = this.props;
    const { noBtnPosition } = this.state;

    const noBtnStyle = {
      position: "absolute",  // меняем на абсолютное позиционирование
      top: noBtnPosition.top,
      right: noBtnPosition.right,
      transition: "top 0.3s ease, right 0.3s ease",
      cursor: "pointer",
    };

    return (
      <div className="wrapper">
        <div className="top">
          <h1 className="title">Тащи жопку сюда!</h1>
          <img className="img" src="./winking.png" alt="" />
          <h2>Кино смотреть</h2>
        </div>
        <div className="button-wrapper" ref={this.buttonWrapperRef}>
          <button onClick={() => onAnswer(true)} data-answer="true" className="button">
            Да
          </button>
          <button
            ref={this.noBtnRef}
            style={noBtnStyle}
            onMouseEnter={this.moveNoButton}
            onClick={this.handleNoClick}
            data-answer="false"
            className="button"
          >
            Нет
          </button>
        </div>
      </div>
    );
  }
}

export default Buttons;