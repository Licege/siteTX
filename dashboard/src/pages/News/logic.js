import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getAllNews, getCurrentNews, getNewsLoadingStatus} from '../../redux/getters/news.getters'
import {
  createNewNews,
  deleteNews as deleteNewsThunk,
  requestAllNews,
  requestNewsById,
  updateNews as updateNewsThunk
} from '../../redux/thunks/news.thunks'
import {useFileLogic} from '../../hooks'

const useNews = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestAllNews())
  }, [])

  return useSelector(getAllNews)
}

const useCurrentNews = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(requestNewsById(id))
  }, [])

  return useSelector(getCurrentNews)
}

export const useNewsHeaderLogic = () => {
  const history = useHistory()

  const redirectToCreateNews = () => history.push(`news/new`)

  return { redirectToCreateNews }
}

export const useNewsCardsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const news = useNews()

  const deleteNews = id => () => dispatch(deleteNewsThunk(id))
  const redirectToEditNews = id => () => history.push(`news/edit/${id}`)

  return { news, deleteNews, redirectToEditNews }
}

export const useCreateNewsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { file, uploadFile, createFormDataWithFile } = useFileLogic()

  const postNews = news => {
    const formData = createFormDataWithFile(news, 'image')
    dispatch(createNewNews(formData))
    history.goBack()
  }

  const cancel = () => {
    history.goBack()
  }

  return { file, uploadFile, postNews, cancel }
}

export const useEditNewsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const currentNews = useCurrentNews()
  const isLoading = useSelector(getNewsLoadingStatus)

  const { file, uploadFile, createFormDataWithFile } = useFileLogic()

  const updateNews = news => {
    const formData = createFormDataWithFile(news, 'image')
    dispatch(updateNewsThunk({ id: currentNews.id, data: formData}))
    history.goBack()
  }

  const cancel = () => {
    history.goBack()
  }

  return { currentNews, updateNews, isLoading, file, uploadFile, cancel }
}