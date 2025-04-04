import styles from './Preloader.module.css'
const Preloader = () => {
	return (
		<div className={styles.preloader__container}>
			<div className={styles.preloader} ></div>
		</div>
	)
}
export default Preloader