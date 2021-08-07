import {useEffect, useState} from 'react'
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

  const [description, setDescription] = useState('')
  const { file, uploadFile, createFormDataWithFile } = useFileLogic()

  const changeDescription = newDescription => setDescription(newDescription)

  const postNews = news => {
    const formData = createFormDataWithFile(news, 'image')

    if (description) formData.append('description', description)

    dispatch(createNewNews(formData))
    history.push('/news')
  }

  const cancel = () => {
    history.push('/news')
  }

  return { file, uploadFile, postNews, changeDescription, cancel }
}

export const useEditNewsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const currentNews = useCurrentNews()
  const [description, setDescription] = useState(currentNews?.description)
  const isLoading = useSelector(getNewsLoadingStatus)

  const { file, uploadFile, createFormDataWithFile } = useFileLogic()

  const changeDescription = newDescription => setDescription(newDescription)

  const updateNews = news => {
    const formData = createFormDataWithFile(news, 'image')

    if (description) formData.append('description', description)

    dispatch(updateNewsThunk({ id: currentNews.id, data: formData}))
    history.push('/news')
  }

  const cancel = () => {
    history.push('/news')
  }

  return { currentNews, updateNews, isLoading, file, uploadFile, changeDescription, cancel }
}