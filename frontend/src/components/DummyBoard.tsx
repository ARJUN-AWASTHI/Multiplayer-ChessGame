


import boardImage from "../assets/boardImage.png"

const DummyBoard = () => {
	return (
		<div className='shadow-lg shadow-cyan-500/30 rounded-sm w-150 h-150 overflow-hidden'>
			<img  src={boardImage} alt="" />
		</div>
	)
}

export default DummyBoard