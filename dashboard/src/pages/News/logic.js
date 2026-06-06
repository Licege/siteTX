import {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
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

const createNewsFormData = (news, description, imageFile) => {
  const formData = new FormData()

  if (news.title !== undefined) formData.append('title', news.title)
  if (news.shortDescription !== undefined) formData.append('shortDescription', news.shortDescription)
  formData.set('description', description)

  if (imageFile) formData.set('image', imageFile)

  return formData
}

const useNews = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestAllNews())
  }, [])

  return useSelector(getAllNews)
}

const useCurrentNews = () => {
  const dispatch = useDispatch()
  const {id} = useParams()

  useEffect(() => {
    dispatch(requestNewsById(id))
  }, [])

  return useSelector(getCurrentNews)
}

export const useNewsHeaderLogic = () => {
  const history = useHistory()

  const redirectToCreateNews = () => history.push('news/new')

  return {redirectToCreateNews}
}

export const useNewsCardsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const news = useNews()

  const deleteNews = id => () => dispatch(deleteNewsThunk(id))
  const redirectToEditNews = id => () => history.push(`news/edit/${id}`)

  return {news, deleteNews, redirectToEditNews}
}

export const useCreateNewsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [description, setDescription] = useState('')
  const {file, uploadFile} = useFileLogic()

  const changeDescription = useCallback(newDescription => setDescription(newDescription), [])

  const postNews = (news, {description: newsDescription = '', file: imageFile} = {}) => {
    const formData = createNewsFormData(news, newsDescription, imageFile)

    dispatch(createNewNews(formData))
    history.push('/news')
  }

  const cancel = () => {
    history.push('/news')
  }

  return {file, uploadFile, postNews, changeDescription, cancel, description}
}

export const useEditNewsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const currentNews = useCurrentNews()
  const [description, setDescription] = useState('')
  const isLoading = useSelector(getNewsLoadingStatus)

  useEffect(() => {
    setDescription(currentNews?.description || '')
  }, [currentNews?.id, currentNews?.description])

  const {file, uploadFile} = useFileLogic()

  const changeDescription = newDescription => setDescription(newDescription)

  const updateNews = (news, {description: newsDescription = '', file: imageFile} = {}) => {
    const formData = createNewsFormData(news, newsDescription, imageFile)

    dispatch(updateNewsThunk({id: currentNews.id, data: formData}))
    history.push('/news')
  }

  const cancel = useCallback(() => history.push('/news'), [])

  return {currentNews, updateNews, isLoading, file, uploadFile, changeDescription, cancel, description}
}